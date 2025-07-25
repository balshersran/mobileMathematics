import { View, Button, Text } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;

export default function Home({ navigation }: Props) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to the Home Screen</Text>
            <Button
                title="Go to Addition Problems"
                onPress={() => navigation.navigate('Addition')}
            />
            <Button
                title="Go to Subtraction Problems"
                onPress={() => navigation.navigate('Subtraction')}
            />
        </View>
    )
}