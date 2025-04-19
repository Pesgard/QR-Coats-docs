import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import { useAuth } from '../utils/AuthContext';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { isAuthenticated, user } = useAuth();

  const { siteConfig } = useDocusaurusContext();
  const { isAuthenticated, user } = useAuth();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
            style={{ marginRight: '10px' }}>
            Documentación 📚
          </Link>
          
          {isAuthenticated ? (
            <Link
              className="button button--success button--lg"
              to="/protected">
              Acceder a Contenido Protegido 🔒
            </Link>
          ) : (
            <Link
              className="button button--info button--lg"
              to="/auth">
              Iniciar Sesión / Registrarse 🚪
            </Link>
          )}
        </div>
        
        {isAuthenticated && user && (
          <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>
            Bienvenido, {user.email} 👋
          </p>
        )}
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="QRcoats Documentación <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
