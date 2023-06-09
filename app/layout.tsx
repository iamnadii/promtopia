import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: 'Promptopia',
    description: 'Discover and Share AI Prompts',
};
const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <Provider session="">
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
};

export default layout;
