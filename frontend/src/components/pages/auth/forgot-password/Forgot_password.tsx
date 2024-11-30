"use client"
import { forgot_password } from '@/types/auth_type'
import { forgot_password_schema } from '@/zod-schemas/auth_zod_schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'


const Forgot_password = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<forgot_password>({ resolver: zodResolver(forgot_password_schema) })
    const onSubmit = (data: forgot_password) => {
        console.log(data)
    }

    return (
        <div className='bg-light_color min-h-screen'>
            <div className='flex justify-center items-center max-w-sm m-auto min-h-screen'>
                <div className='bg-white w-full p-6 py-50 rounded-lg'>
                    <div>
                        <Image src="/assets/forgotpassword.jpg" alt="Forgot Password" width={500} height={300} />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-2'>
                            <Controller
                                control={control}
                                name='email'
                                render={({ field }) => (
                                    <Input {...field} type='email'
                                        aria-label="email"
                                        placeholder="Enter your email"
                                        variant="bordered"
                                        label="Email"
                                        isInvalid={!!errors.email}
                                        color={errors.email ? "danger" : "default"}
                                        fullWidth
                                    />
                                )}

                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email?.message}
                                </p>
                            )}
                        </div>

                        <div className='flex justify-center my-6'>
                            <Button type='submit' className='bg-black text-white w-full'>Submit</Button>
                        </div>
                        <div className='text-end'>
                            <p>Remember passwords?    <Link href={'/auth/sign-in'} className='text-base text-black'>Sign in</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Forgot_password