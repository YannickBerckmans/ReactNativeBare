import { ListItem } from '@material-ui/core';
import React from 'react';
import { NativeRouter, Route, Link,  useHistory} from "react-router-native";

/*
PROPS: link: lien pour le bouton
       name : nom du bouton
       keys : identification unique du bouton

       
RETURN: un graphique contenant toutes les infos
*/

export default function Button(props) {
  const history = useHistory();

  function handleClick() {
    history.push(props.link);
  }

  return (
      
    <ListItem button key={props.keys} onClick={() => handleClick()}>{props.name}</ListItem>
    
  );
}