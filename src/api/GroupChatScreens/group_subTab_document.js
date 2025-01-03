import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../DomainAPI";


export const group_getAllDocumentOfGroup = async () => {
    const response = await axios.get(API_BASE_URL + "/api/v1/document/getAllDocumentOfGroup?groupID=" + await AsyncStorage.getItem('groupID'), {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        },
    });
    return response;
}

export const group_addDocument = async (fileResult) => {

    var uri = fileResult.assets[0].uri;
    const formData = new FormData();
    //formData.append('file', fileResult.assets[0].uri);
    formData.append("file", {
        uri,
        name: fileResult.assets[0].name,
        type: fileResult.assets[0].mimeType,
      });
    formData.append('groupID', await AsyncStorage.getItem('groupID'));

    const response = await axios.post(API_BASE_URL + "/api/v1/document/addDocument", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        },
    });
    return response;
}
