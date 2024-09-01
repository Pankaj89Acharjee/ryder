import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, Image, ScrollView, View } from "react-native"

const SignUp = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onSignUpPress = async () => {

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
                        placeholder='Pls enter your name'
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

                    {/* Implement Social login */}

                    <Link href="/(auth)/sign-in"
                        className="text-lg text-center text-general-200 mt-8"
                    >
                        <Text >Already have an account with us? </Text>
                        <Text className="text-primary-500">Sign In</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUp;