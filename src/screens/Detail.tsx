import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppRouteParams } from 'navigation/type'
import axios from 'apis/app-axios'
import { sprintf } from 'sprintf-js'
import * as apiEndPoints from 'constants/api-endpoints'
import { JobList } from 'type/entities/joblist.type'
import PanahKiri from 'assets/panahkiri.svg'

type DetailRouteParams = NativeStackScreenProps<AppRouteParams, 'Detail'>
const Detail = (props: DetailRouteParams) => {
     const { navigation, route: { params } } = props
     const [detail, setDetail] = useState<JobList>()
     const [full, setFull] = useState('')
     const [url, setUrl] = useState('')

     useEffect(() => {
          axios.get<JobList>(sprintf(apiEndPoints.DETAIL, params.id))
               .then(res => {
                    setDetail(res.data)
                    if (detail?.type === 'Full Time') {
                         setFull('Yes')
                    } else {
                         setFull('No')
                    }
               })
     }, [full])

     useEffect(() => {
          if (detail?.company_url !== undefined) {
               setUrl(detail?.company_url)
          }
     }, [detail?.company_url])

     return (
          <ScrollView style={styles.container}>
               <View style={styles.head}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                         <TouchableOpacity onPress={() => navigation.goBack()}>
                              <Image source={require('assets/angle-left.png')} style={{ width: 20, height: 20 }} />
                         </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingRight: 40 }}>
                         <Text>JOB DETAIL</Text>
                    </View>
               </View>
               <View style={styles.body}>
                    <Text>Company</Text>
                    <View style={styles.topBox}>
                         <View style={{ flex: 1, alignItems: 'center' }}>
                              <Image source={{ uri: detail?.company_logo }} style={{ width: 100, height: 100 }} />
                         </View>
                         <View style={{ flex: 1 }}>
                              <Text style={{ fontWeight: 'bold', marginVertical: 3 }}>{detail?.company}</Text>
                              <Text style={{ marginVertical: 3 }}>{detail?.location}</Text>
                              <Text style={{ textDecorationLine: 'underline', color: 'blue', marginVertical: 3 }} onPress={() => { Linking.openURL(url) }}>Go to Website</Text>
                         </View>
                    </View>
                    <Text style={{ marginTop: 20 }}>Job Specification</Text>
                    <View style={styles.bottomBox}>
                         <View style={{ paddingHorizontal: 10, paddingTop: 20 }}>
                              <View>
                                   <Text style={{ color: 'grey' }}>Title</Text>
                                   <Text>{detail?.title}</Text>
                              </View>
                              <View style={{ paddingTop: 20 }}>
                                   <Text style={{ color: 'grey' }}>Fulltime</Text>
                                   <Text>{full}</Text>
                              </View>
                              <View style={{ paddingTop: 20 }}>
                                   <Text style={{ color: 'grey' }}>Descriptions</Text>
                                   <Text>{detail?.description}</Text>
                              </View>
                         </View>

                    </View>
               </View>
          </ScrollView>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1
     },
     head: {
          flexDirection: 'row',
          marginHorizontal: 20,
          paddingTop: 10
     },
     body: {
          marginHorizontal: 10,
          marginTop: 20
     },
     topBox: {
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 10,
          flexDirection: 'row',
          height: 'auto',
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center'
     },
     bottomBox: {
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 10,
          flexDirection: 'row',
          height: 'auto',
          marginTop: 10,
     }
})

export default Detail