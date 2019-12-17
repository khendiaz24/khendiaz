<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'khendiaz_db');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '<cTqdT79DnpLDjp3#3MfZ5>8KdMS}3X;ho#-h}^t0sV<y<iC*nDRIThDn&Z[Gq!1');
define('SECURE_AUTH_KEY',  'tz[t%@lAGs0z>4^}:%Yzo[fcAzA1:g}T/6^eW7XB(QjF;jLEIycs}<usI/ws7Wq?');
define('LOGGED_IN_KEY',    'V~PPcXE.qAPs~9b0aYtk=1AY`(I)E YG<O~;B,68u(!#-s%x4I}k+-((W<]xEf-J');
define('NONCE_KEY',        '*+V?@0OE+Qj,5urF5y,%`GH>:CkSo/o~sE0f27,GFYd=1f]h8  4G`/i2dZa@:zy');
define('AUTH_SALT',        '21OGO$~u>:W~j/(&*]25XgI+LDsLeTrWBMc+~xk*6)88OaDwSE9c_@[GNtYkNA o');
define('SECURE_AUTH_SALT', '`{0T+2B|]qEg;46^_]sjK>C:oFDF~kA$$?J#}%p-KyoXdO?|5ht[l95nAUluV`#0');
define('LOGGED_IN_SALT',   'xoD?GgN*Da/}^RF*dh.{G`@LOyV[.niD/m:C!:CnF$,>.$I_Z|UY}}XR_!&dN)kK');
define('NONCE_SALT',       ' 4(/s:9&oR@6ysPK~ ZJ>}GTKXE!_wbF5FXJP.$tkT3GP8cZ_IA&J-~?9nku{+jc');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
