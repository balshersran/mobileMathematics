import { View } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;

export default function Home({ navigation }: Props) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

        </View>
    )
}