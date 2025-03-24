import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";
import { mdiYinYang } from '@mdi/js'; // Импортируем иконку mdi-yin-yang
import Icon from '@mdi/react'; // Импортируем компонент для отображения иконок

// Рендеринг элементов
const itemRenderer = (item) => (
    <NavLink to={item.path} className="flex align-items-center p-menuitem-link">
        {/* Если у item.icon есть путь к иконке, отобразим его с помощью компонента Icon */}
        <Button label={item.label} icon={<Icon path={item.icon} size={1} />} className="p-button-text" />
    </NavLink>
);

export const HEADER_NAV_ITEMS = [
    {
        label: 'Home',
        icon: 'pi pi-home',  // Если хотите оставить PrimeReact иконку, оставьте так
        path: '/',
        template: itemRenderer
    },
    {
        label: 'TODO LIST',
        icon: 'pi pi-home',  // Та же иконка для других элементов
        path: '/todolist',
        template: itemRenderer
    },
    {
        label: 'Access Control',
        icon: 'pi pi-shield',
        items: [
            {
                label: 'Users',
                icon: 'pi pi-user',
                path: '/users',
                template: itemRenderer
            },
            {
                label: 'Settings',
                icon: 'pi pi-cog',
                path: '/settings',
                template: itemRenderer
            }
        ]
    },
    {
        label: 'Anilibria',
        icon: mdiYinYang,  // Замените на иконку MDI
        path: '/anilibria',
        template: itemRenderer
    }
];
