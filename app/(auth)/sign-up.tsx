import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, Image, ScrollView, View, Alert } from "react-native"
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";

const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp()

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [verification, setVerification] = useState({
        state: 'default',
        error: '',
        code: ''
    })

    const onSignUpPress = async () => {
        if (!isLoaded) {
            return
        }

        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            setVerification({ ...verification, state: 'pending' })
        } catch (err: any) {
            Alert.alert("Error!", err.errors[0].longMessage)
        }
    }

    const onPressVerify = async () => {
        if (!isLoaded) {
            return
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            })

            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId })
                setVerification({ ...verification, state: 'success' })
            } else {
                setVerification({ ...verification, error: 'Verification failed', state: 'failed' })
                console.error(JSON.stringify(completeSignUp, null, 2))
            }
        } catch (err: any) {
            setVerification({ ...verification, error: err.errors[0].longMessage, state: 'failed' })
            console.error(JSON.stringify(err, null, 2))
        }
    }

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Image
                        source={images.signUpCar}
                        className="w-full h-[250px] z-0"
                    />
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">Create a new account</Text>
                </View>

                <View className="p-5">
                    <InputField
                        label='Name'
                        placeholder='Enter your name'
                        icon={icons.person}
                        value={form.name}
                        onChangeText={(value) => setForm({
                            ...form,
                            name: value
                        })}
                    />
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
                        title="Sign-up"
                        onPress={onSignUpPress}
                        className="mt-6"
                    />

                    {/* Implementation of OAUTH */}
                    <OAuth />

                    <Link href="/(auth)/sign-in"
                        className="text-lg text-center text-general-200 mt-8"
                    >
                        <Text >Already have an account with us? </Text>
                        <Text className="text-primary-500">Sign In</Text>
                    </Link>
                </View>

                <ReactNativeModal
                    isVisible={verification.state === "pending"}
                    // onBackdropPress={() =>
                    //   setVerification({ ...verification, state: "default" })
                    // }
                    onModalHide={() => {
                        if (verification.state === "success") {
                            setShowSuccessModal(true);
                        }
                    }}
                >
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Text className="font-JakartaExtraBold text-2xl mb-2">
                            Verify OTP
                        </Text>
                        <Text className="font-JakartaSemiBold mb-5">
                            We've sent a verification code to {form.email}.
                        </Text>
                        <InputField
                            label={"Code"}
                            icon={icons.lock}
                            placeholder={"12345"}
                            value={verification.code}
                            keyboardType="numeric"
                            onChangeText={(code) =>
                                setVerification({ ...verification, code })
                            }
                        />
                        {verification.error && (
                            <Text className="text-red-500 text-sm mt-1">
                                {verification.error}
                            </Text>
                        )}
                        <CustomButton
                            title="Verify Email"
                            onPress={onPressVerify}
                            className="mt-5 bg-success-500"
                        />
                    </View>
                </ReactNativeModal>


                <ReactNativeModal isVisible={showSuccessModal}>
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Image
                            source={images.check}
                            className="w-[110px] h-[110px] mx-auto my-5"
                        />
                        <Text className="text-3xl font-JakartaBold text-center">
                            Verified
                        </Text>
                        <Text className="text-base text-gray-400 font-JakartaSemiBold text-center mt-2">
                            You have successfully verified your account.
                        </Text>
                        <CustomButton
                            title="Browse Home"
                            onPress={() => {
                                setShowSuccessModal(false);
                                router.push(`/(root)/(tabs)/home`)
                            }}
                            className="mt-5"
                        />
                    </View>
                </ReactNativeModal>
            </View>
        </ScrollView>
    );
};

export default SignUp;