import { useRouter } from "next/router";

const TodoDetails = () => {
    const router = useRouter();
    const{id} = router.query;
  return (
    <div>Details for To-Do {id}</div>
  )
}

export default TodoDetails