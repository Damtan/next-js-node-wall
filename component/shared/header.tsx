import Link from "next/link";
import {JWTCookie} from "../../services/security/JWTCookie";
import {useEffect, useState} from "react";

const Header = () => {
    const [isJWTExpired, setIsJWTExpired] = useState(true);

    useEffect(() => {
        const jwtCookie = new JWTCookie();
        setIsJWTExpired(jwtCookie.isJWTExpired());
    }, []);

    return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {isJWTExpired ? (
              <>
                  <li>
                      <Link href="/register">
                          <a>Register</a>
                      </Link>
                  </li>
                  <li>
                      <Link href="/login">
                          <a>Login</a>
                      </Link>
                  </li>
              </>
          ) : (
              <>
                  <li>
                      <Link href="/profile">
                          <a>Profile</a>
                      </Link>
                  </li>
                  <li>
                      <a href="/logout">Logout</a>
                  </li>
              </>
          )}
        </ul>
      </nav>
      <style jsx>{`
        nav {
          max-width: 42rem;
          margin: 0 auto;
          padding: 0.2rem 1.25rem;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
        }
        li:first-child {
          margin-left: auto;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
        header {
          color: #fff;
          background-color: #333;
        }
      `}</style>
    </header>
  );
};

export default Header;
