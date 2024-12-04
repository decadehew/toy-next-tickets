'use client'

export default function TestForm() {
  const testAction = (formData: FormData) => {
    console.log(formData)
  }
  return (
    <form action={testAction}>
      <label htmlFor="title">Title</label>
      <input type="text" name="title" />
      <label htmlFor="content">Content</label>
      <input type="text" name="content" />
      <button>Create Ticket</button>
    </form>
  )
}
