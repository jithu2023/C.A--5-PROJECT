import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

function Forms() {
    const [submit, setSubmit] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        setSubmit(true);
    };

    return (
        <div className=" container2 bg-white min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-black opacity-85 p-8 rounded-md shadow-lg">
                <div className="flex justify-center items-center mb-8">
                    <img className="logo2 w-24" src="https://kalvium.com/wp-content/uploads//2023/04/Kalvium-Logo-SVG.svg" alt="Logo" />
                </div>
               
                {submit ? (
                    <div className="p-6 bg-black rounded-md shadow-lg">
                        <h2 className="ml-10 mb-4 text-2xl font-semibold text-white">Registration Successful!</h2>
                        <p className="mb-4 text-blue-500 text-center text-white">
                            Explore a world of literature with Kalvium, your premier book reading app. Immerse yourself in a diverse library, enjoy personalized recommendations, and track your reading progress. Download offline for a seamless reading experience. Happy reading!
                        </p>
                        <p className="font-semibold text-white text-center">Happy Reading</p>
                        <NavLink to="/">
                        <button className="home px-5 py-2 bg-red-500 rounded text-white font-bold hover:bg-red-700">
  Home
</button>
                        </NavLink>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <strong className="create mb-8 text-3xl font-bold text-white text-center">Create Your Account</strong>
                        {renderInput("First name", "firstName", { required: true, minLength: 3, maxLength: 30 })}
                        {renderInput("Last name", "lastName", { required: true, minLength: 3, maxLength: 30 })}
                        {renderInput("Email", "email", { required: true, pattern: /^\S+@\S+$/i })}
                        {renderInput("Password", "password", { required: true, minLength: 10, pattern: /.*[\W]+.*/i })}
                        {renderInput("Confirm password", "confirmPassword", {
                            validate: (value) => value === watch("password"),
                        })}
                        <button
                            type="submit"
                            className="w-full h-10 px-4 bg-purple-500 rounded text-white font-bold text-lg transform transition duration-300 hover:scale-105 disabled:bg-gray-400"
                            disabled={Object.keys(errors).length > 0}
                        >
                            SignUp
                        </button>
                    </form>
                )}
            </div>
        </div>
    );

    function renderInput(placeholder, name, rules) {
        return (
            <div>
                <input
                    type={name.includes("password") ? "password" : "text"}
                    placeholder={placeholder}
                    className="border rounded-lg mb-2 border-white h-12 pl-4 outline-none w-full transition duration-300 focus:ring focus:border-purple-300 text-white"
                    {...register(name, rules)}
                />
                <span className="text-red-700 text-sm">
                    {errors[name] && errors[name].type === "required" && `${placeholder} is required`}
                    {errors[name] && errors[name].type === "minLength" && `${placeholder} should have a minimum of 3 characters`}
                    {errors[name] && errors[name].type === "maxLength" && `${placeholder} can only have a maximum of 30 characters`}
                    {errors[name] && errors[name].type === "pattern" && `Enter a valid ${placeholder.toLowerCase()}`}
                    {errors[name] && errors[name].type === "validate" && "Passwords must match"}
                </span>
            </div>
        );
    }
}

export default Forms;
