<?php
/*
Not used. Use Model.php instead, which does not require PEAR.
*/
// Base class
if (!defined('__ROOT__')) { define('__ROOT__', dirname(dirname(__FILE__))); }
class Model {
    public static $db;

	// Change database details here
    public static function initialize() {
         try{
					self::$db = new PDO('odbc:Driver={SQL Server};Server=gjoseph\commvault;Database=vehiclepool; Uid=sa;Pwd=builder!12;', null, null,array(
																											PDO::ATTR_PERSISTENT => true)); 
				// $user = getenv('EngSQLDBUser');
				// $pwd = getenv('EngSQLDBPwd');				
				// self::$db = new PDO('odbc:Driver={SQL Server};Server=engsql.gp.cv.commvault.com\ENGSQL;Database=projectplan', $user,$pwd,array(
																										// PDO::ATTR_PERSISTENT => true));   

			}
		   catch( PDOException $e ) {
				//$log->error(" Exception while cteating PDO: ".$e->getMessage());
				error_log(" Exception while cteating PDO: ".$e->getMessage());
				die( "Error connecting to SQL Server" );
			}
			self::$db->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER);
			self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public static function query($query) {
		$stmt = NULL;
		try{
			$stmt = self::$db->query($query);
            // error_log($query);
		}
		catch( Exception $e ) {
			error_log(" Exception while query the database; Error: ".$e->getMessage().' :::: Query : '.$query);
		}
     	//self::checkError($stmt);
        return $stmt;
    }
    
    public static function fetchRow($query) {
        $res =& self::query($query);
        
        if ($res->rowCount() === 0) {
            return NULL;
        }
        
        $row = $res->fetch(PDO::FETCH_ASSOC);
        return $row;
    }
	
	public static function doesExist($query) { //does a record with satisfying $query exists in respective table
        $res =& self::query($query);
        
        if ($res->rowCount() === 0) {
            return false;
        }
        return true;
    }
    public static function fetchAll($query) {
        $res = self::query($query);                
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }

}
Model::initialize();
?>