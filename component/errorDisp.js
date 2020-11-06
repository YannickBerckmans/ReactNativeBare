import React, { Component, useState } from 'react'
import { Text, View } from 'react-native'
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { onChange } from 'react-native-reanimated';

/*
PROPS: disp : bool permettant de dire si visible ou non
       title : titre du dialogue 
       text : texte du dialogue
       onChange : methode pour modifier l'etat de visibilité
       
RETURN: un dialogue pour transmettre des instruction ou erreur au user
*/



export default function ErrorDisp(props) {
    
    return (
        <View>
            
            <Portal>
                <Dialog visible={props.disp} onDismiss={() =>props.onChange(false)}>
                    <Dialog.Title>{props.title}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{props.text}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => props.onChange(false)}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

