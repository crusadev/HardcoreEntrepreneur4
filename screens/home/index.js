import {Text,View,TouchableOpacity,FlatList} from "react-native"
import {useCallback, useState} from "react"
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Homepage({navigation}){
    const [notes,setNotes] = useState("")
    useFocusEffect(
        useCallback(() => {
            const getNotes = async () => {
                const extractedNotes = JSON.parse(await AsyncStorage.getItem("notesList"))
                setNotes(extractedNotes.notes)
                console.log(extractedNotes.notes)
            }
            getNotes();
        },[])
    )
    const handleDelete = async (id) => {
        const extractedNotes = JSON.parse(await AsyncStorage.getItem("notesList"));
        const finalNotes = extractedNotes.notes.filter((note) => note.id !== id);
        AsyncStorage.setItem("notesList",JSON.stringify({notes:finalNotes}))
        console.log(finalNotes)
        setNotes(finalNotes)
    }
    return(
        <View>
            <Text>Hello World</Text>
            <TouchableOpacity onPress={() => navigation.navigate("create-note")}>
                <Text>Create</Text>
            </TouchableOpacity>
            {notes && <FlatList
            keyExtractor={(item) => item.title}
            data={notes}
            renderItem={({item}) => (
                <View>
                    <Text>{item.title}</Text>
                    <Text>{item.description}</Text>
                    <Text>{item.id}</Text>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                        <Text>Delete</Text>
                    </TouchableOpacity>
                </View>
            )}/>}
        </View>
    )
}