import React, { useEffect, useState } from 'react';
import DocSidebar from '@theme-original/DocSidebar';
import { getSession } from '../../utils/supabase';
import styles from './styles.module.css';

export default function DocSidebarWrapper(props) {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
      const fetchUser = async () => {
          const { session } = await getSession();
          if (session) {
            setUser(session.user);
            // Extraer nombre amigable del email o metadata
            const displayName = session.user.user_metadata?.full_name || 
                               session.user.email.split('@')[0];
            setUserName(displayName);
          }
      };
  
      fetchUser();
    }, []);

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.docSidebarContainer}>
        <DocSidebar {...props} />
      </div>
      
      {user && (
        <div className={styles.userInfoContainer}>
          <div className={styles.userLabel}>Usuario Logueado</div>
          <div className={styles.userEmail}>
            <span className={styles.userIcon}>👤</span>
            {user.email}
          </div>
          {userName && userName !== user.email.split('@')[0] && (
            <div className={styles.userName}>
              <span className={styles.userIcon}>✓</span> {userName}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
