import { z } from "zod"


// -- Tasks -- //
export const taskStatusSchema = z.enum(['pending', 'onHold', 'in-progress', 'completed']);

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'> 



// -- Projects -- //
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string()
})

export const dashboardProjectSchema = z.array(projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true
}))
export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>