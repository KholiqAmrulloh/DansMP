import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { JobListItemProps } from "./joblist-item.type"
import { encode } from 'base64-arraybuffer'

const JobListItem = (props: JobListItemProps) => {
     const { index, data, onPress } = props;

     return (
          <TouchableOpacity style={style.content} onPress={onPress}>
               <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                         <Image source={{ uri: data.company_logo }} style={{ width: 50, height: 50, padding: 10 }} />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                         <View style={{ paddingVertical: 20 }}>
                              <Text style={{ fontWeight: 'bold' }}>{data.title}</Text>
                              <Text>{data.company}</Text>
                              <Text>{data.location}</Text>
                         </View>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                         <Image source={require('assets/angle-right.png')} style={{ width: 15, height: 15 }} />
                    </View>
               </View>
          </TouchableOpacity>
     )
}

const style = StyleSheet.create({
     content: {
          borderColor: 'black',
          borderWidth: 1,
          marginVertical: 10,
          height: 'auto',
     },
     views: {
          justifyContent: "center",
          alignItems: "center"
     }
})

export default JobListItem