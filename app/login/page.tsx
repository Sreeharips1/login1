
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';


// const LoginPage = () => {
//     const router = useRouter();
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const script = document.createElement('script');
//         script.id = 'otpless-sdk';
//         script.type = 'text/javascript';
//         script.dataset.appid = process.env.NEXT_PUBLIC_OTPLESS_APP_ID; // Use environment variable
//         script.src = 'https://otpless.com/v4/auth.js';
//         document.head.appendChild(script);

//         // OTPLESS callback function
//         window.otpless = async (otplessUser: any) => {
//             const token = otplessUser.token;
//             console.log('Token:', token);
//             console.log('User Details:', JSON.stringify(otplessUser));

//             setLoading(true);
//             try {
//                 const response = await fetch('http://localhost:5000/api/auth/otpless-login', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ token }),
//                 });

//                 const data = await response.json();
//                 if (data.user) {
//                     router.push('/dashboard'); // Redirect to dashboard
//                 } else {
//                     router.push('/register'); // Redirect to registration page
//                 }
//             } catch (error) {
//                 console.error('Error during authentication:', error);
//                 alert('Login failed. Please try again.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         return () => {
//             if (document.getElementById('otpless-sdk')) {
//                 document.head.removeChild(document.getElementById('otpless-sdk')!);
//             }
//             // @ts-ignore
//             delete window.otpless;
//         };
//     }, [router]);

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-4">
//             <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border-2 border-red-800 max-w-md w-full">
//                 {loading ? (
//                     <div className="flex justify-center">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-800"></div>
//                     </div>
//                 ) : (
//                     <div id="otpless-login-page" className="flex justify-center"></div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default LoginPage;

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.id = 'otpless-sdk';
        script.type = 'text/javascript';
        script.dataset.appid = process.env.NEXT_PUBLIC_OTPLESS_APP_ID;
        script.src = 'https://otpless.com/v4/auth.js';
        document.head.appendChild(script);

        // OTPLESS callback function
        window.otpless = async (otplessUser: any) => {
            console.log('User Details:', JSON.stringify(otplessUser));
            
            // Extract email from otplessUser object
            const email = otplessUser.email;
            
            if (!email) {
                console.error('Email not found in OTPless response');
                alert('Login failed. Please try again.');
                return;
            }

            setLoading(true);
            try {
                // Match this with your backend endpoint
                const response = await fetch('http://localhost:5000/api/auth/handlelogin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();
                
                if (response.ok) {
                    if (data.newUser) {
                        // New user - redirect to registration with email
                        router.push(`/register?email=${encodeURIComponent(email)}`);
                    } else {
                        // Existing user - save token and redirect to dashboard
                        localStorage.setItem('authToken', data.token);
                        router.push('/dashboard');
                    }
                } else {
                    alert(data.error || 'Login failed. Please try again.');
                }
            } catch (error) {
                console.error('Error during authentication:', error);
                alert('Login failed. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        return () => {
            if (document.getElementById('otpless-sdk')) {
                document.head.removeChild(document.getElementById('otpless-sdk')!);
            }
            // @ts-ignore
            delete window.otpless;
        };
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-4">
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border-2 border-red-800 max-w-md w-full">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>
                <p className="text-gray-300 text-center mb-6">Log in to access your gym membership details</p>
                
                {loading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-800"></div>
                    </div>
                ) : (
                    <div id="otpless-login-page" className="flex justify-center"></div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;



