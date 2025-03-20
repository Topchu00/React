import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'
export default function MainPage() {

    // Состояние в React - это объект который содержит некие переменные, влияющие на рендеринг компонента.Когда состояние меняется, React автоматически перерисовывает компонент или по другому ре-рендерит.

    // Хуки - это функции, которые позволяют нам "подцепиться" к состоянию и методам жизненного цикла React из функционального компонента.

    // useState - это хук в React который позволяет добавлять состояние в компонентах

    // Жизненный цикл компоненты - это последовательность этапов, через которые проходит компонента React от его создания (монтирования) до его удаления (размонтирования) из DOM 

    // Этапы жизненного цикла компоненты:
    // 1. Mounting (монтирование)
    // 2. Updating (обновление)
    // 3. Unmounting (размонтирование)

    // useEffect - это хук в React который позволяет выполнять побочные эффекты в функциональных компонентах.



    const [value, setValue] = useState(2)
    const [count, setCount] = useState(2)

    useEffect(() => {
        console.log('обновление компонента прошло успешно')

    }, [count])

    return (
        <div>
            <p>
                <b>{value === 0 ?
                    'Минимальное значение' : value
                }</b>
            </p>
            <div>
                <Button label='Click -' onClick={() => {
                    if (value > 0) {
                        setValue(value - 1)
                    }
                }} />

                <Button label='Click +' onClick={() => setValue(value + 1)} />
            </div>

            <p>
                <b>{count === 0 ?
                    'Минимальное значение' : count
                }</b>
            </p>
            <div>
                <Button label='Click -' onClick={() => {
                    if (count > 0) {
                        setCount(count - 1)
                    }
                }} />

                <Button label='Click +' onClick={() => setCount(count + 1)} />
            </div>
            <h1>Main Page</h1>
        </div>
    )
}