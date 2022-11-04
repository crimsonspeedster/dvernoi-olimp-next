import React, {useContext, useState} from 'react';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';


interface LayoutProps {
    children: any
}

const Layout:React.FC<LayoutProps> = ({children}) => {
    const [ isOpenFilter, setIsOpenFilter ] = useState<boolean>(false);

    return (
        <div className="wrapper">
            <Header
                isOpenFilter={isOpenFilter}
                setIsOpenFilter={setIsOpenFilter}
            />

            <main className="main">
                {children}
            </main>

            <Footer />
        </div>
    )
}

export default Layout;