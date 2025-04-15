import React from "react";
import { Link } from "react-router";
import { useSignUp } from "../authHooks/authHooks";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUp() {
    const [inputData, setInputData] = React.useState({
        fullName: "",
        email: "",
        password: "",
    });
    const { mutateAsync: createSignUp, isPending, isSuccess, isError, error, data } = useSignUp()

    // console.log( error && error, data , 'isSuccess, isError, error, data')
    const handleChange = (e) => {
        const { name, value } = e.target
        setInputData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            createSignUp(inputData)
        } catch (error) {
            console.log(error, 'signUp-error')
        }
    }
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-black">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Sign Up</CardTitle>
                            <CardDescription>Create your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input
                                            id="fullName"
                                            type="text"
                                            name="fullName"
                                            placeholder="Enter your Full Name"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="example.com"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isPending}

                                    >
                                        {isPending ? 'loading' : 'Sign Up'}
                                    </Button>
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Do you have an account?{" "}
                                    <Link to="/signin" className="underline underline-offset-4">
                                        Sign In
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}