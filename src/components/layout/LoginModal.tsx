import { Link } from 'react-router-dom';

import { useState } from 'react';
import Logo from '../../assets/img/logo.png'
import useLoginModal from '../../state/useLoginModal';
import { Button } from '../ui';
import GoogleLogin from '../ui/GoogleLogin';
import useAuth from '../../state/useAuth';

export function LoginModal() {
    const loginModal = useLoginModal();
    const [isDarkMode] = useState(
        document.documentElement.classList.contains("dark")
    );
    return (
        <div className="h-screen w-screen bg-gray-400">
            <div
                onClick={() => loginModal.hide()}
                className="fixed grid place-items-center bg-black/50 top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
                    <div className="relative container m-auto px-6"
            onClick={(e) => e.stopPropagation()}>
                    <div className="m-auto md:w-7/12">
                        <div className="bg-white border border-gray-400 dark:bg-neutral-800 shadow-xl">
                            <div className="p-8">
                                <div className="flex justify-center items-center">
                                    <img src={Logo} loading="lazy"
                                        className="w-12 h-12" />
                                    <h2 className="self-center text-xl text-gray-900 dark:text-white font-bold">Login ke BASIS-64
                                    </h2>
                                </div>
                                <div className="mt-5 grid space-y-4 flex px-4">
                                    { !useAuth().user ? (<GoogleLogin isDarkMode={isDarkMode} />) : ''}
                                    <Button variant="outline-gray" className="mx-4" size='sm' onClick={() => loginModal.hide()}>Tutup</Button>
                                </div>
                                <div className="mt-2 space-y-4 py-3 text-gray-600 dark:text-gray-400 text-center">
                                    <p className="text-xs">By proceeding, you agree to our 
                                        <Link to="/privacy-policy/" className="underline" onClick={() => loginModal.hide()}>Terms of Use</Link>
                                         and confirm you have read our 
                                        <Link to="/privacy-policy/" className="underline" onClick={() => loginModal.hide()}>Privacy and Cookie Statement</Link>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
