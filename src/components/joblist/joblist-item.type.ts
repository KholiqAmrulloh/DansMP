import { JobList } from "type/entities/joblist.type";

export interface JobListItemProps {
     index: number,
     data: JobList,
     onPress: () => void
}