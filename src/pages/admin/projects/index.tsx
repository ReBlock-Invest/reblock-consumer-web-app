

import AdminLayout from "components/layouts/AdminLayout"
import ProjectsTable from "components/modules/projects/admin/ProjectsTable"
import React from "react"
import projects from 'dummy/projects.json'
import Project from "entities/project/Project"
// import useRepositories from "hooks/useRepositories"
// import { useQuery } from "react-query"
// import useAuthenticationStore from "stores/useAuthenticationStore"


const AdminProjectsPage: React.FC = () => {
  // const repositories = useRepositories()
  // const authenticationStore = useAuthenticationStore()

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ['borrower-address'],
  //   queryFn: () => repositories.rbProBackendRepository?.getBorrowerAddress(),
  //   enabled: !!authenticationStore.token,
  // })
  
  //TODO:
  //Validate if this wallet ID is a valid borrower.
  //Currently there is blocker that data from backend 
  //can't be properly parsed.

  return (
    <AdminLayout>
      <ProjectsTable
        data={projects as Project[]}
      />
    </AdminLayout>
  )
}

export default AdminProjectsPage