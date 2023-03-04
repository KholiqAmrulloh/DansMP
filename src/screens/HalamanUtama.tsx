import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
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
     const [loadingJoblist, setLoadingJoblist] = useState<boolean>(true)
     const [loadMoreJoblist, setLoadMoreJoblist] = useState<boolean>(false)

     useEffect(() => {
          axios.get<JobList[]>(apiEndPoints.JOBLIST)
               .then(res => {
                    setJobList(res.data)
               })
     }, [])

     const doFilter = () => {
          setExpand(!expand)
     }

     // const reload = useCallback((offset: number = 0, limit: number = 10, replaceAll: boolean = true) => {
     //      if(replaceAll) {
     //           setLoadingJoblist(true)
     //      }
     //      return axios.get<JobList[]>((apiEndPoints.JOBLIST), {
     //           params: {offset, limit}
     //      })
     //      .then((result) => {
     //           setLoadingJoblist(false)
     //           setLoadMoreJoblist()

     //      })
     // }, [])
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
                                   <TextInput placeholder='search' style={{ paddingHorizontal: 5 }} />
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