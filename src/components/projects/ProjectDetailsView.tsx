import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { getProjectsById } from '@/api/ProjectAPI';
import AddTaskModal from '../tasks/AddTaskModal';
import TaskList from '../tasks/TaskList';
import EditTaskData from '../tasks/EditTaskData';

const ProjectDetailsView = () => {

  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectsById(projectId!),
    retry: false,
  });

  if (isLoading) return "Cargando";
  if (isError) return <Navigate to="/404"/>;

  if(data) return (
    <>
     <h1 className='text-5xl font-black'>{data.projectName}</h1>
     <p className='text-2xl font-light text-gray-500 mt-5'>{data.description}</p>

     <nav className='my-5 flex gap-3'>
      <button 
        type='button'
        onClick={() => navigate(location.pathname + '?newTask=true')}
        className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'> 
        Agregar Tarea
      </button>
     </nav>
     <AddTaskModal/>
     <TaskList tasks={data.tasks}/>
     <EditTaskData/>
    </>
  )
}

export default ProjectDetailsView
