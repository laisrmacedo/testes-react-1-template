import { render, screen } from '@testing-library/react'
import  userEvent from '@testing-library/user-event'
import TodoList from '../components/TodoList'

describe("TodoList", () => {
    test("deve renderizar com titulo", () => {
        //componente que quero testar
        render(<TodoList/>)
        // screen.debug() --> mesma funçao do console.log
        // const title = screen.getByText("Todo List")
        //regex que abrange mais possibilidades (regex101.com)
        const title = screen.getByText(/todo list/i)
        expect(title).toBeInTheDocument()
    })

    test("deve renderizar com input vazio", () => {
        render(<TodoList/>)
        //forma de selecionar o input
        const input = screen.getByPlaceholderText(/enter a todo/i)
        expect(input).toHaveValue("")
    })

    test("deve atualizar valor do input ao ser digitado", async () => {
        //tem que ser antes do render
        const user = userEvent.setup() 
        render(<TodoList/>)
        const input = screen.getByPlaceholderText(/enter a todo/i)
        //interagir
        await user.type(input, "revisar react")
        //assertiva acerca do valor do input
        expect(input).toHaveValue("revisar react")
    })

    test("deve renderizar uma nova tarefa ao digitar no input e pressionar a tecla enter", async () => {
        //tem que ser antes do render
        const user = userEvent.setup() 
        render(<TodoList/>)
        const input = screen.getByPlaceholderText(/enter a todo/i)
        //essa é a forma de esperar o evento de clique em uma tecla
        await user.type(input, "revisar react{enter}")
        const item = screen.getByText("revisar react")
        //evitar falso positivo. depois que da enter, o input fica vazio
        expect(input).toHaveValue("")
        expect(item).toBeInTheDocument()
    })

    test("deve renderizar uma nova tarefa ao digitar no input e pressionar a tecla enter", async () => {
        //tem que ser antes do render
        const user = userEvent.setup() 
        render(<TodoList/>)
        const input = screen.getByPlaceholderText(/enter a todo/i)
        //essa é a forma de esperar o evento de clique em uma tecla
        await user.type(input, "revisar react{enter}")
        //sugestao do playground para selecionar o botao
        const toggleBtn = screen.getByRole('button', {
            name: /toggle/i
        })
        
        const item = screen.getByText("revisar react")

        await user.click(toggleBtn)
        expect(item).toHaveStyle("text-decoration: line-through")
        await user.click(toggleBtn)
        expect(item).toHaveStyle("text-decoration: none")
    })

    test("deve apagar a tarefa ao clicar no botao", async () => {
        //tem que ser antes do render
        const user = userEvent.setup() 
        render(<TodoList/>)
        const input = screen.getByPlaceholderText(/enter a todo/i)
        //essa é a forma de esperar o evento de clique em uma tecla
        await user.type(input, "revisar react{enter}")
        //sugestao do playground para selecionar o botao
        const deleteBtn = screen.getByRole('button', {
            name: /delete/i
        })
        
        const item = screen.queryByText("revisar react")

        await user.click(deleteBtn)
        expect(item).not.toBeInTheDocument("revisar react")
    })
})