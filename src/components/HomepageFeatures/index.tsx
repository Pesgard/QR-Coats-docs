import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Documentación Completa',
    Svg: require('@site/static/img/document.svg').default,
    description: (
      <>
        Accede a guías detalladas sobre todos los componentes de QRcoats: 
        Panel de Administración, SuperAdmin, Aplicación de Clientes, y APIs.
        Todo diseñado para facilitar la comprensión y el desarrollo.
      </>
    ),
  },
  {
    title: 'Sistema de QR Inteligente',
    Svg: require('@site/static/img/qr-code.svg').default,
    description: (
      <>
        Descubre cómo QRcoats implementa un sistema avanzado de códigos QR
        para seguimiento de productos, validación de autenticidad
      </>
    ),
  },
  {
    title: 'Arquitectura Moderna',
    Svg: require('@site/static/img/cloud-computing.svg').default,
    description: (
      <>
        Explora la arquitectura basada en AWS de QRcoats, 
        con integraciones de NestJS, React, y mongoDB 
        que conforman un ecosistema robusto y escalable.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
