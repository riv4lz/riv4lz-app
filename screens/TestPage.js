import React, { useState } from 'react';
import {Text, View, TextInput, Image} from "react-native";
import {Form, Formik} from "formik";
import {
    ButtonText,
    ExtraText,
    ExtraView,
    Line,
    MsgBox,
    StyledButton,
    StyledFormArea,
    TextLink, TextLinkContent
} from "../components/styles";

export default function TestPage() {
    const [imageSrc, setImageSrc] = useState();
    const [uploadData, setUploadData] = useState();

    /**
     * handleOnChange
     * @description Triggers when the file input changes (ex: when a file is selected)
     */

    function handleOnChange(changeEvent) {
        const reader = new FileReader();

        reader.onload = function(onLoadEvent) {
            setImageSrc(onLoadEvent.target.result);
            setUploadData(undefined);
        }

        reader.readAsDataURL(changeEvent.target.files[0]);
    }

    /**
     * handleOnSubmit
     * @description Triggers when the main form is submitted
     */

    async function handleOnSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

        const formData = new FormData();

        for ( const file of fileInput.files ) {
            formData.append('file', file);
        }

        formData.append('upload_preset', 'my-uploads');

        const data = await fetch('https://api.cloudinary.com/v1_1/RIV4LZ/image/upload', {
            method: 'POST',
            body: formData
        }).then(r => r.json());

        setImageSrc(data.secure_url);
        setUploadData(data);
    }

    return (
        <View>
            <Text>Image Uploader</Text>

            <Formik
                initialValues={{imageSrc: ''}}
                onSubmit={(values) => {
                   console.log(values);
                }}
            >
                {({handleChange, handleSubmit, values}) => <StyledFormArea>

                    <TextInput>
                        type={file}
                        name={"file"}
                    </TextInput>

                    <Image source={imageSrc}></Image>

                    {imageSrc && !uploadData && (
                            <Button>Upload Files</Button>
                    )}

                    {uploadData && (
                        <Text>{JSON.stringify(uploadData, null, 2)}</Text>
                    )}
                </StyledFormArea>}
            </Formik>
        </View>
    )
}
