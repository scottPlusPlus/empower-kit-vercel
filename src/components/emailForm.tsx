"use client"

import { useEffect, useState } from "react";

type Props = {
    onSubmitEmail?: (arg0: string) => void,
}

export default function EmailForm(props: Props) {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [showThanks, setShowThanks] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateEmail(email)) {
            // Perform your desired action with the valid email
            console.log('Email submitted:', email);
            if (props.onSubmitEmail) {
                props.onSubmitEmail(email);
            } else {
                console.log('No onSubmitEmail handler');
            }
            setShowThanks(true);
            setButtonDisabled(true);
        } else {
            setIsValidEmail(false);
        }
    };

    const validateEmail = (email: string): boolean => {
        // A simple email validation check using regular expression
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (showThanks) {
            timer = setTimeout(() => {
                setShowThanks(false);
            }, 3000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [showThanks]);

    const handleCloseMessage = () => {
        setShowThanks(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Enter your email"
                        className={`form-input text-sm py-2 text-slate-800 ${!isValidEmail ? 'border-red-500' : ''
                            }`}
                        value={email}
                        required
                        onChange={handleEmailChange}
                    />

                    {/* <button
                    type="submit"
                    className="btn-sm inline-flex items-center text-blue-50 bg-blue-500 hover:bg-blue-600 group shadow-sm"
                >
                    Join Waitlist
                </button> */}
                    {/*  <button type="submit" className="btn-sm w-full inline-flex items-center text-slate-100 bg-slate-800 hover:bg-slate-900 group shadow-sm">*/}
                    <button type="submit" className="btn-sm w-full inline-flex items-center text-slate-100 bg-amber-400 hover:bg-orange-500 group shadow-sm" disabled={buttonDisabled}>
                        Join Waitlist
                        <span className="tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                            <svg className="fill-current" width="12" height="10" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 6.002h7.586L6.293 8.295a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.416l-4-4a1 1 0 0 0-1.414 1.416l2.293 2.293H1a1 1 0 1 0 0 2Z" />
                            </svg>
                        </span>
                    </button>
                </div>
                {!isValidEmail && (
                    <p className="text-red-500 mt-1">Please enter a valid email</p>
                )}
            </form>
            {showThanks && (
                <div className="fixed inset-0 flex items-center justify-center" data-aos="fade-up" data-aos-delay="100">
                <div className="flex m-4 p-4 bg-amber-600 text-white rounded-lg shadow-lg">
                    <p>Thanks!</p>
                    <button
                        onClick={handleCloseMessage}
                        className="pl-4 text-white hover:text-gray-200 focus:text-gray-200"
                    >X
                    </button>
                </div>
                </div>
            )}


        </div>

        //     <form>
        //     <div className="space-y-4">
        //       <div className="sm:flex items-start justify-between sm:space-x-4">
        //         <label className="block text-sm leading-5 mt-2.5 text-slate-800 font-[550] text-left mb-1.5 sm:mb-0" htmlFor="first-name">
        //           First name
        //         </label>
        //         <div className="sm:w-72 xl:w-80 shrink-0">
        //           <input id="first-name" className="form-input text-sm py-2 w-full" type="text" placeholder="Patrick" required />
        //         </div>
        //       </div>

        //     <div className="mt-6 text-right">
        //       <button className="btn-sm inline-flex items-center text-blue-50 bg-blue-500 hover:bg-blue-600 group shadow-sm">
        //         Submit the form
        //       </button>
        //     </div>
        //   </form>
    )
}