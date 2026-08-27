import {createFileRoute} from '@tanstack/react-router'

const RouteComponent = () => {
    return <div>Change this to layout</div>
}

export const Route = createFileRoute('/_app')({
    component: RouteComponent,
})