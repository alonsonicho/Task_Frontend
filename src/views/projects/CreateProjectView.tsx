import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify";
import ProjectForm from "@/components/projects/ProjectForm";
import type { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";

const CreateProjectView = () => {

  const navigate = useNavigate();
  const initialValues : ProjectFormData= {
    projectName: "",
    clientName: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response) => {
      toast.success(response.message)
      navigate('/')
    }
  })

  const handleForm = (data : ProjectFormData) => mutation.mutate(data)
 



  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para crear un proyecto
        </p>
        <nav className="my-5">
          <Link
            to="/"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          >
            Volver a proyectos
          </Link>
        </nav>
        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm 
            register={register}
            errors={errors}
          />
          <input
            type="submit"
            value="Crear proyecto"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full rounded-md p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};

export default CreateProjectView;
