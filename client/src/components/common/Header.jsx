import { Container } from "./Design";

export const Header = () => {
  return (
    <header className="header bg-primary py-4 fixed w-full top-0 left-0 z-50">
      <Container>
        <nav className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-14">
            <img src="../images/common/header-logo.png" alt="logo" className="h-11" />
          </div>
          
        </nav>
      </Container>
    </header>
  );

  
};
