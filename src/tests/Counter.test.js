import { render, screen } from '@testing-library/react'
import  userEvent from '@testing-library/user-event'
import Counter from '../components/Counter'

describe("Counter", () => {
    test("deve renderizar com titulo", () => {

        render(<Counter/>)

        const title = screen.getByText(/counter/i)
        expect(title).toBeInTheDocument()
    })

    test("deve atualizar o valor do contador para 3 quando o botao + for clicado 3 vezes", async () => {
        const user = userEvent.setup() 
        render(<Counter/>)
        
        const item = screen.getByText(/0/i)

        const plusBtn = screen.getByRole('button', {
            name: /\+/i
        })
        
        await user.click(plusBtn)
        await user.click(plusBtn)
        await user.click(plusBtn)

        // expect(item).toBeInTheDocument("3") --> falso positivo. apenas verifica se o item esta no documento e nao recebe parametro
        expect(item).toHaveTextContent("3")
    })
})