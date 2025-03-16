import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';

export function GenVideo() {
    const [taskType, setTaskType] = useState('t2v');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [prompt, setPrompt] = useState('');
    const [aspectRatio, setAspectRatio] = useState('9:16');
    const [fileName, setFileName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [uploadError, setUploadError] = useState('');
    const [quantity, setQuantity] = useState('2');
    const [imageUrl, setImageUrl] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // 清除之前的状态
            setFileName(file.name);
            setImageFile(file);
            setImageUrl(''); // 清除之前的URL
            setError('');
            setUploadError(''); // 清除上传错误

            // 检查文件类型
            const fileType = file.type;
            if (!fileType.match('image/jpeg') && !fileType.match('image/png') && !fileType.match('image/jpg')) {
                setUploadError('只支持JPG和PNG格式的图片');
                setFileName('');
                setImageFile(null);
                return;
            }

            // 检查文件大小（限制为10MB）
            if (file.size > 10 * 1024 * 1024) {
                setUploadError('图片大小不能超过10MB');
                setFileName('');
                setImageFile(null);
                return;
            }

            // 创建FormData对象并添加文件
            const formData = new FormData();
            formData.append('file', file);

            // 显示上传中状态
            setIsSubmitting(true);

            // 首先获取上传令牌
            fetch('/upload/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 401) {
                        window.location.href = '/login';
                        throw new Error('Please login first');
                    }
                    return response.json();
                })
                .then(tokenData => {
                    console.log(tokenData);
                    if (!tokenData.success) {
                        throw new Error(tokenData.message || 'Get upload token failed');
                    }

                    // 将令牌添加到 FormData
                    formData.append('token', tokenData.token);

                    // 发送文件上传请求
                    return fetch('https://file.wanx.space/', {
                        method: 'POST',
                        headers: {
                            'Upload-Token': tokenData.token
                        },
                        body: formData
                    });
                })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(data => {
                            throw new Error(data.error || 'Something went wrong');
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    if (data.success) {
                        // 保存文件URL
                        setImageUrl(data.url);
                    } else {
                        throw new Error(data.message || 'Upload failed, please try again1');
                    }
                    setIsSubmitting(false);
                })
                .catch(error => {
                    setUploadError('文件上传失败: ' + error.message); // 使用专门的上传错误状态
                    setIsSubmitting(false);
                    setImageFile(null); // 清除文件引用
                    setFileName(''); // 清除文件名
                });
        }
    };

    const submitTask = () => {
        setIsSubmitting(true);
        setError(''); // 清除任务提交错误

        // 对于图生视频，需要检查是否有图片URL
        if (taskType === 'i2v' && imageFile) {
            if (imageUrl) {
                // 如果已经有图片URL，直接使用
                sendRequest(imageUrl);
            } else {
                // 如果没有图片URL，说明上传失败或未完成
                setIsSubmitting(false);
                setError('请等待图片上传完成或重新上传');
            }
        } else {
            // 文生视频直接发送请求
            sendRequest();
        }
    };

    const sendRequest = (imageUrl: string | null = null) => {
        // 准备JSON数据
        const requestData: any = {
            type: taskType,
            prompt: prompt,
            aspect_ratio: aspectRatio,
        };

        // 根据任务类型添加不同的参数
        if (taskType === 't2v') {
            requestData.aspectRatio = aspectRatio;
        } else if (imageUrl) {
            requestData.image = imageUrl;
        }

        // 发送JSON请求
        fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.error || 'Something went wrong');
                    });
                }
                return response.json();
            })
            .then(data => {
                // 成功处理
                setIsSubmitting(false);
                // 重置表单
                setPrompt('');
                setImageFile(null);
                setFileName('');
                setImageUrl('');
                setAspectRatio('9:16');
                setTaskType('t2v');
                setError('');
                window.location.href = '/generate#history';
            })
            .catch(error => {
                // 错误处理
                setIsSubmitting(false);
                setError('任务提交失败: ' + error.message); // 明确标识为任务提交错误
            });
    };

    const resetUpload = () => {
        setImageUrl('');
        setImageFile(null);
        setFileName('');
        setUploadError(''); // 清除上传错误
        setError(''); // 清除任务错误
    };

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const prevSibling = e.currentTarget.previousElementSibling as HTMLElement;
        if (prevSibling) {
            prevSibling.style.display = 'none';
        }
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const prevSibling = e.currentTarget.previousElementSibling as HTMLElement;
        if (prevSibling) {
            prevSibling.style.display = 'none';
        }
        e.currentTarget.src = 'https://placehold.co/400x300/3730a3/ffffff?text=加载失败';
    };

    const handleRecharge = () => {
        // 这里需要替换为实际的用户信息和支付URL
        window.location.href = `https://pay.wanx.space/checkout?app_id=wanx.space&user_id=${userInfo?.UserID}&email=${userInfo?.Email}&price_id=price_1QySl7AJMSmBVDIMPwxJHbZT&callback_url=https://wanx.space&quantity=${quantity}`;
    };

    // 这些值需要从后端获取或通过props传入
    const isLogin = true; // 假设用户已登录
    const userInfo = { UserID: '123', Email: 'user@example.com' }; // 假设的用户信息
    const balance = '500'; // 假设的余额

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-semibold text-white mb-6">Generate By Wanx 2.1</h2>

                {/* 任务类型选择 */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-white/80 mb-2">Task Type</label>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setTaskType('t2v')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${taskType === 't2v' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'
                                }`}
                        >
                            Text To Video
                        </button>
                        <button
                            onClick={() => setTaskType('i2v')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${taskType === 'i2v' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'
                                }`}
                        >
                            Image To Video
                        </button>
                    </div>
                </div>

                {/* 图片上传 - 仅在图生视频模式显示 */}
                {taskType === 'i2v' && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-white/80 mb-2">上传图片</label>
                        <div
                            className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-200 hover:border-indigo-400 ${fileName && !uploadError ? 'border-indigo-500 bg-indigo-500/10' :
                                uploadError ? 'border-red-500 bg-red-500/10' : 'border-white/20'
                                }`}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                                disabled={isSubmitting}
                            />

                            {!fileName && !isSubmitting && !uploadError && (
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                    <p className="mt-2 text-sm text-white/60">Drop or click to upload</p>
                                    <p className="text-xs text-white/40 mt-1">Support JPG, PNG format</p>
                                </div>
                            )}

                            {isSubmitting && !imageUrl && (
                                <div className="text-white flex flex-col items-center justify-center">
                                    <svg className="animate-spin h-10 w-10 text-indigo-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <p className="text-sm text-white/60">Uploading...</p>
                                </div>
                            )}

                            {fileName && !isSubmitting && !uploadError && (
                                <div className="text-white flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="truncate max-w-xs">{fileName}</span>
                                </div>
                            )}

                            {uploadError && (
                                <div className="text-red-400 flex flex-col items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                    </svg>
                                    <p className="text-sm">{uploadError}</p>
                                    <button
                                        onClick={resetUpload}
                                        className="mt-2 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs rounded-md transition-colors"
                                    >
                                        重新上传
                                    </button>
                                </div>
                            )}

                            {imageUrl && (
                                <div className="mt-4 text-sm text-indigo-300">
                                    <p className="font-medium">File uploaded successfully</p>
                                    <div className="mt-3 relative">
                                        <div className="w-full h-full absolute inset-0 flex items-center justify-center">
                                            <svg className="animate-spin h-8 w-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </div>
                                        <img
                                            ref={imgRef}
                                            src={imageUrl}
                                            className="max-h-48 sm:max-h-64 max-w-full mx-auto rounded-lg border border-indigo-500/30 shadow-lg object-contain bg-black/20"
                                            alt="预览图片"
                                            onLoad={handleImageLoad}
                                            onError={handleImageError}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <button
                                            onClick={resetUpload}
                                            className="text-xs text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            Upload again
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* 提示语输入框 */}
                <div className="mb-6">
                    <label htmlFor="prompt" className="block text-sm font-medium text-white/80 mb-2">Prompt</label>
                    <div className="relative">
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            placeholder="Describe the content you want to generate..."
                        ></textarea>
                        <div className="absolute bottom-3 right-3 text-xs text-white/40">
                            {prompt.length}/500
                        </div>
                    </div>
                </div>

                {/* 视频比例选择 */}
                {taskType === 't2v' && (
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-white/80 mb-2">Video Ratio</label>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setAspectRatio('9:16')}
                                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${aspectRatio === '9:16' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'
                                    }`}
                            >
                                <div className="flex items-center justify-center">
                                    <div className="w-4 h-7 bg-current opacity-60 rounded"></div>
                                    <span className="ml-2">9:16 Vertical</span>
                                </div>
                            </button>
                            <button
                                onClick={() => setAspectRatio('16:9')}
                                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${aspectRatio === '16:9' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'
                                    }`}
                            >
                                <div className="flex items-center justify-center">
                                    <div className="w-7 h-4 bg-current opacity-60 rounded"></div>
                                    <span className="ml-2">16:9 Horizontal</span>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {/* 提交按钮 */}
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    {isLogin && (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 order-2 sm:order-first w-full sm:w-auto">
                            <div className="w-full sm:w-auto flex items-center px-4 py-2 bg-white/10 text-white font-medium rounded-xl border border-white/20 shadow-md">
                                <span className="text-white/70 text-sm mr-1">$10 = 1000 credits</span>
                                <span className="text-white/70 text-sm mx-1">×</span>
                                <div className="relative inline-block">
                                    <select
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="appearance-none bg-white/10 text-indigo-300 font-semibold rounded px-2 py-1 pr-6 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                            <option key={num} value={num.toString()}>{num}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/70">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <button
                                    onClick={handleRecharge}
                                    className="ml-2 px-2 py-1 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors duration-200"
                                >
                                    Recharge
                                </button>
                            </div>
                            <div className="w-full sm:w-auto flex items-center px-4 py-2 bg-white/10 text-white font-medium rounded-xl border border-white/20 shadow-md">
                                <span className="text-white/70 text-sm mr-1">Credits:</span>
                                <span className="text-indigo-300 font-semibold">
                                    {balance}
                                </span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="text-red-500 text-sm px-4 order-1">
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        onClick={isLogin ? submitTask : () => window.location.href = '/login'}
                        disabled={isSubmitting || (taskType === 'i2v' && !imageFile) || !prompt}
                        className={`w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 h-12 flex items-center justify-center order-3 sm:order-last ${isSubmitting || (taskType === 'i2v' && !imageFile) || !prompt ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {!isSubmitting ? (
                            <span>Generate</span>
                        ) : (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </span>
                        )}
                    </button>
                </div>

                {/* tips */}
                <div className="text-sm text-white/80 mt-4">
                    <p>Video generation takes 2-3 minutes, please be patient</p>
                </div>
            </div>
        </div>
    );
}
