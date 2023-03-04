import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Switch } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppRouteParams } from 'navigation/type'
import axios from 'apis/app-axios'
import { JobList } from 'type/entities/joblist.type'
import JobListItem from 'components/joblist/joblist-item.component'
import * as apiEndPoints from 'constants/api-endpoints'

type HalamanUtamaScreenProps = NativeStackScreenProps<AppRouteParams, 'HalamanUtama'>
const HalamanUtama = ({ navigation }: HalamanUtamaScreenProps) => {
     const [jobList, setJobList] = useState<JobList[]>([])
     const [expand, setExpand] = useState(false)
     const [filterDesc, setFilterDesc] = useState('')
     const [filterFulltime, setFilterFulltime] = useState(false)
     const [filterLocation, setFilterLocation] = useState('')
     const [tempFilterFulltime, setTempFilterFulltime] = useState(false)
     const [tempfilterLocation, setTempFilterLocation] = useState('')

     useEffect(() => {
          const params = {
               description: filterDesc ? filterDesc.toLowerCase() : undefined,
               full_time: filterFulltime,
               location: filterLocation ? filterLocation.toLowerCase() : undefined
          }
          console.log(params)
          axios.get<JobList[]>(apiEndPoints.JOBLIST, {
               params: params
          })
               .then(res => {
                    setJobList(res.data)
               })
     }, [filterDesc, filterFulltime, filterLocation])

     const doFilter = () => {
          setExpand(!expand)
     }

     const setFilterDescription = useCallback((text: string) => {
          setFilterDesc(text)
     }, [])

     const applyNow = () => {
          setFilterFulltime(tempFilterFulltime)
          setFilterLocation(tempfilterLocation)
     }

     return (
          <View style={styles.container}>
               <View style={{ marginHorizontal: 10 }}>
                    <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                         <Text>JOB LIST</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                         <View style={styles.textInput} >
                              <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 }}>
                                   <Image source={require('assets/search.png')} style={{ width: 15, height: 15 }} />
                              </View>
                              <View>
                                   <TextInput placeholder='search' style={{ paddingHorizontal: 5 }} onChangeText={setFilterDescription} />
                              </View>
                         </View>
                         <View style={{ paddingHorizontal: 5, justifyContent: 'center', alignItems: 'center' }}>
                              <TouchableOpacity onPress={doFilter}>
                                   {!expand &&
                                        <Image source={require('assets/angle-down.png')} style={{ width: 20, height: 20 }} />
                                   }
                                   {expand &&
                                        <Image source={require('assets/angle-up.png')} style={{ width: 20, height: 20 }} />
                                   }
                              </TouchableOpacity>
                         </View>
                    </View>
                    {expand &&
                         <View style={{ borderColor: 'black', borderWidth: 1, marginTop: 5, paddingHorizontal: 5 }}>
                              <View style={{ flexDirection: 'row' }}>
                                   <View style={{ justifyContent: 'center', flex: 1 }}>
                                        <Text>Fulltime</Text>
                                   </View>
                                   <View>
                                        <Switch value={tempFilterFulltime} onValueChange={setTempFilterFulltime} />
                                   </View>
                              </View>
                              <View style={{ flexDirection: 'row' }}>
                                   <View style={{ justifyContent: 'center', flex: 1 }}>
                                        <Text>Location</Text>
                                   </View>
                                   <View>
                                        <TextInput style={{ borderWidth: 1, borderColor: 'black', width: 300, paddingHorizontal: 5 }} onChangeText={setTempFilterLocation} />
                                   </View>
                              </View>
                              <View style={{ marginVertical: 5, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                   <TouchableOpacity style={{ backgroundColor: '#DDDDDD', borderColor: 'black', borderWidth: 1, width: 80, justifyContent: 'center', alignItems: 'center' }} onPress={applyNow}>
                                        <Text>Apply now</Text>
                                   </TouchableOpacity>
                              </View>
                         </View>
                    }
                    <View style={{ marginTop: 20 }}>
                         <FlatList
                              data={jobList}
                              renderItem={(({ index, item }) => {
                                   return <JobListItem data={item} index={index} onPress={() => navigation.navigate('Detail', { id: item.id })} />
                              })}
                         />
                    </View>
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1
     },
     textInput: {
          flexDirection: 'row',
          borderColor: 'black',
          borderWidth: 1,
          flex: 1,
          borderRadius: 20
     }
})

export default HalamanUtama