import {View,Text, TouchableOpacity,TextInput} from "react-native"
import {useState} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default CreateNotes = ({navigation}) => {
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const handleSubmit = async () => {
        const data = await AsyncStorage.getItem("notesList");
        console.log(data)
        if(data == "null" || !data){
            const id = Math.floor(Math.random() * 1000000)
            await AsyncStorage.setItem("notesList",JSON.stringify({notes:[{title,description,id}]}))
            navigation.navigate("home")
            console.log("first case")
        }else{
            const currentNotes = JSON.parse(data);
            const id = Math.floor(Math.random() * 1000000)
            const new_data = {notes:[{title,description,id},...currentNotes.notes]};
            await AsyncStorage.setItem("notesList",JSON.stringify(new_data));
            navigation.navigate("home")
            console.log("second case")
        }
    }

    return(
        <View>
            <Text>Create Note</Text>
            <TextInput placeholder="Title" onChangeText={(input) => setTitle(input)}></TextInput>
            <TextInput placeholder="Description" onChangeText={(input) => setDescription(input)}></TextInput>
            <TouchableOpacity onPress={() => handleSubmit()}>
            <Text>{title} {description}</Text>
            </TouchableOpacity>
        </View>
    )
}