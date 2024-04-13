

import AdminLayout from "components/layouts/AdminLayout"
import ProjectsTable from "components/modules/projects/admin/ProjectsTable"
import React, { useMemo } from "react"
import Project from "entities/project/Project"
import { useQuery } from "react-query"
import useServices from "hooks/useServices"
// import useRepositories from "hooks/useRepositories"
// import { useQuery } from "react-query"
// import useAuthenticationStore from "stores/useAuthenticationStore"


const AdminProjectsPage: React.FC = () => {
  const services = useServices()

  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => services.projectService.getProjects(),
  })

  const projects = useMemo(() => (data || []).map((d)=> d.data), [data])

  return (
    <AdminLayout>
      <ProjectsTable
        data={projects as Project[]}
        loading={isLoading}
      />
    </AdminLayout>
  )
}

export default AdminProjectsPage