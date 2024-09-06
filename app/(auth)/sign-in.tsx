import { useCallback, useState } from "react";
import { Text, Image, ScrollView, View, Alert } from "react-native"
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link, useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";



const SignIn = () => {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const onSignInPress = useCallback(async () => {
        if (!isLoaded) {
            return
        }

        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            })

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/')
            } else {
                // See https://clerk.com/docs/custom-flows/error-handling
                // for more info on error handling
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err: any) {
            Alert.alert("Error!", err.errors[0].longMessage)
            console.error(JSON.stringify(err, null, 2))
        }
    }, [isLoaded, form.email, form.password])

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Image
                        source={images.signUpCar}
                        className="w-full h-[250px] z-0"
                    />
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">Hey folk! Welcome 👋</Text>
                </View>

                <View className="p-5">
                    <InputField
                        label='Email'
                        placeholder='Pls enter your email'
                        icon={icons.person}
                        value={form.email}
                        onChangeText={(value) => setForm({
                            ...form,
                            email: value
                        })}
                    />
                    <InputField
                        label='Password'
                        placeholder='Pls enter password'
                        icon={icons.lock}
                        value={form.password}
                        secureTextEntry={true}
                        onChangeText={(value) => setForm({
                            ...form,
                            password: value
                        })}
                    />

                    <CustomButton
                        title="Sign-In"
                        onPress={onSignInPress}
                        className="mt-6"
                    />

                    {/* Implementation of OAUTH */}
                    <OAuth />

                    <Link href="/(auth)/sign-up"
                        className="text-lg text-center text-general-200 mt-8"
                    >
                        <Text >Don't have an account? </Text>
                        <Text className="text-primary-500">Sign Up</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignIn;



