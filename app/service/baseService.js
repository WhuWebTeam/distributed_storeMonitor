/**
 * Base class of all service class releated to database table
 * @module baseService
 * @since 1.0.0
 */


module.exports = app => {
    class BaseService extends app.Service {

        /**
         * Constructor of BaseService
         * @public
         * @constructor
         * @param {Object} app - egg application
         * @since 1.0.0
         */
        constructor(app) {
            super(app);

            this.defaultReturn = {
                flag: false,
                data: ''
            }
        }


        /**
         * Generate response body
         * @public
         * @method BaseService#__generateResponse
         * @param {Number} status - status code of response
         * @param {Object} data - response body
         * @return {Object}
         * Object with message when response code grater than 400
         * Object with response data when response code less than 400
         * @since 1.0.0
         */
        __generateResponse(status, data) {
            status = +status;
            if (status >= 400) {
                return {
                    code: status,
                    message: data
                };
            }
            return {
                code: status,
                data
            }
        }


        /**
         * Used to filter some attribute which not undefined or null
         * @private
         * @method BaseService#__judge
         * @param {Array} entry - array with two element changed from objects
         * @return {Boolean}
         * true when second element(or object's value) is not undefined or null
         * false when second element(or object's value) is undefined or null
         * @since 1.0.0
         */
        __judge(entry) {
            if (entry[1] === false) {
                return true;
            } else if (entry[1] === 0) {
                return true;
            } else if (entry[1]) {
                return true;
            } else {
                return false;
            }
        }


        /**
         * Query opration satisfied some condition of database
         * @public
         * @method BaseService#_query
         * @param {String} tableName - name of table waited to query
         * @param {Array[String]} attributes - attributes wanted to query
         * @param {Object} wheres - condition  when query table
         * @return {Promise<Array[Object]>}
         * Array include obect releated to table record when query
         * @since 1.0.0
         */
        async __query(tableName, attributes, wheres) {
            const _this = this;

            // generate query str and values
            const values = [];
            let str = 'select ';
            for (const attribute of attributes) {
                str = str + attribute + ', ';
            }
            str = str.substr(0, str.length - 2);
            str = str + ' from ' + tableName;

            // when query without where condition(wheres is a {})
            if (JSON.stringify(wheres) === '{}') {
                const result = await this.app.db.query(str, values);
                // console.log(str);
                // console.log(values);
                return result;
            }

            // where query with where condition (wheres is not a {})
            str = str + ' where ';

            // change object to array
            const entries = Object.entries(wheres).filter(entry => _this.__judge(entry));
            if (entries.length === 0) {
                str = str.substr(0, str.length - 7);
                const result = await this.app.db.query(str, values);
                // console.log(str);
                // console.log(values);
                return result;
            }

            for (let i = 0; i < entries.length; i++) {
                str = str + entries[i][0] + ' = $' + (i + 1) + ' and ';
                values.push(entries[i][1]);
            }
            str = str.substr(0, str.length - 5);

            // console.log(str);
            // console.log(values);
            const result = await this.app.db.query(str, values);
            return result;
        }


        /**
         * Count opration satisfied some condition of database
         * @public
         * @method BaseService#_count
         * @param {String} tableName - name of table waited to oprate
         * @param {String} attribute - attributes wanted to be count of table record
         * @param {Object} wheres - Condition when count table record
         * @return {Promise<Number>}
         * positive number when count table record successed
         * -1 when count table record failed
         * @since 1.0.0
         */
        async __count(tableName, attribute, wheres) {
            attribute = 'count(' + attribute +')';
            let count = await this.__query(tableName, [attribute], wheres);
            count = count[0] && +count[0].count || -1;
            return count;
        }


        /**
         * Update opration satisfied some condition of database
         * @public
         * @method BaseService#_update
         * @param {String} tableName - name of table waited to oprate
         * @param {Object} obj - record waited to be update in database
         * @param {Object} wheres - condition when update table record
         * @since 1.0.0
         */
        async __update(tableName, obj, wheres) {
            const _this = this;

            // generate query str and values
            const values = [];
            let str = 'update ' + tableName + ' set ';

            // change object to array
            let entries = Object.entries(obj).filter(entry => _this.__judge(entry));
            let i = 0;
            for (; i < entries.length; i++) {
                str = str + entries[i][0] + ' = $' + (i + 1) + ', ';
                values.push(entries[i][1]);
            }
            str = str.substr(0, str.length - 2);

            if(JSON.stringify(wheres) === '{}') {
                console.log(str);
                console.log(values);
                await this.app.db.query(str, values);
                return;
            }

            str = str + ' where ';
            entries = Object.entries(wheres).filter(entry => _this.__judge(entry));
            for (let j = 0; j < entries.length; j++) {
                str = str + entries[j][0] + ' = $' + (j + i + 1) + ' and ';
                values.push(entries[j][1]);
            }
            str = str.substr(0, str.length - 5);
            console.log(str);
            console.log(values);
            await this.app.db.query(str, values);
        }


        /**
         * Insert opration of database
         * @public
         * @method BaseService#_insert
         * @param {String} tableName - name of table waited to be oprate
         * @param {Object} obj - record info waited to be insert into database
         * @since 1.0.0
         */
        async __insert(tableName, obj) {
            const _this = this;

            // generate query str and values
            const values = [];
            let str = 'insert into ' + tableName + '(';
            let temp = '(';

            // change object to array
            const entries = Object.entries(obj).filter(entry => _this.__judge(entry));
            for (let i = 0; i < entries.length; i++) {
                str = str + entries[i][0] + ', ';
                temp = temp + '$' + (i + 1) + ', ';
                values.push(entries[i][1]);
            }
            str = str.substr(0, str.length - 2) + ')';
            temp = temp.substr(0, temp.length - 2) + ')';
            str = str + ' values ' + temp;

            console.log(str);
            console.log(values);
            await this.app.db.query(str, values);
        }


        /**
         * Delete opration of database
         * @public
         * @method BaseService#_delete
         * @param {String} tableName - name of table waited to oprate
         * @param {Object} wheres - Condition when delete table record
         * @since 1.0.0
         */
        async __delete(tableName, wheres) {
            const _this = this;

            const values = [];
            let str = 'delete from ' + tableName;
            if (JSON.stringify(wheres) === '{}') {
                await this.app.db.query(str, values);
                return;
            }
            str = str + ' where ';
            const entries = Object.entries(wheres).filter(entry => _this.__judge(entry));
            for (let i = 0; i < entries.length; i++) {
                str = str + entries[i][0] + ' = $' + (i + 1) + ' and ';
                values.push(entries[i][1]);
            }
            str = str.substr(0, str.length - 5);

            await this.app.db.query(str, values);
        }


        /**
         * Set table attribute value to avoid parameter attack
         * @public
         * @method BaseService#setTableValue
         * @param {Object} tableObj - object releated to database table
         * @param {Object} paramObj - object releated table passed from caller
         * @return {Object}
         * {} when paramObj is not exists or paramObj attributes doesn't include table attributes
         * Object whose all attributes are table attributes when paramObj attributes includes table attributes
         * @since 1.0.0
         */
        __formatTableValue(tableObj, paramObj) {

            // used to store the table attributes
            const obj = {};

            // parameter paramObj is not an object or cann't convert to object
            if (!paramObj) {
                return obj;
            }

            // filer attributes just releated to database
            Object.entries(tableObj).map(tableAttri => {

                // table object's attribute exists in parameter object and the value of parameter object exists
                if (paramObj[tableAttri[0]]) {
                    obj[tableAttri[0]] = paramObj[tableAttri[0]];
                    return;
                }

                // table object's attribute exists in parameter object and the value of parameter object equal to false
                if (paramObj[tableAttri[0]] === false) {
                    obj[tableAttri[0]] = paramObj[tableAttri[0]];
                    return;
                }

                // table object's attribute exists in parameter object and the value of parameter object equal to 0
                if (paramObj[tableAttri[0]] === 0) {
                    obj[tableAttri[0]] = paramObj[tableAttri[0]];
                    return;
                }
            });
            return obj;
        }


        /**
         * Format attributes to table attributes
         * @public
         * @method BaseService#__formatQueryAttributes
         * @param {Object} tableObj -  object releated to database table
         * @param {Array[String]} paramAttri - array includes attributes releated to database table
         * @return {Array[String]}
         * Array whose element all are table attributes
         * @since 1.0.0
         */
        __formatQueryAttributes(tableObj, paramAttri) {

            // the attributes queried is just include '*'
            if (paramAttri.length === 1 && paramAttri[0] === '*') {
                return paramAttri;
            }

            // the attributes queried is just include 'max()'
            if (paramAttri.length === 1 && paramAttri[0].includes('max')) {
                return paramAttri;
            }

            // the attributes queried is just include 'min()'
            if (paramAttri.length === 1 && paramAttri[0].includes('min')) {
                return paramAttri;
            }

            // the attribute queried include more than one attribute
            const attributes = [];
            const tableAttri = Object.keys(tableObj);
            paramAttri.map(ele => {
                if (tableAttri.includes(ele)) {
                    attributes.push(ele);
                }
            });

            if (attributes.length !== 0) {
                return attributes;
            }

            return ['*'];
        }


        /**
         * Validate parameter is whitespace or not
         * @public
         * @method BaseService#__parameterExists
         * @param {Object} param - parameter waited to be judged exists or not
         * @return {Boolean}
         * true when parameter exists
         * false when parameter doesn't exist
         * @since 1.0.0
         */
        __parameterExists(param) {

            // parameter doesn't exist
            if (param === '' || param === null || param == undefined) {
                return false;
            }

            // parameter exists
            return true;
        }


        /**
         * Sort object array according to object attribute
         * @public
         * @method BaseService#__sort
         * @param {Array[Object]} array - object array waited to sort
         * @param {String} attrbbute - object attribute as sort attribute
         * @param {Boolean} increase - increase flag stand for increase sort or not
         * @return {Promise<Array[Object]>}
         * Array[Object] sorted according to increase flag
         * @since 1.0.0
         */
        __sort(array, attribute, increase) {
            return array.sort((ele1, ele2) => {
                if (ele1[attribute] > ele2[attribute]) {
                    return increase;
                }

                return !increase;
            });
        }
    }

    return BaseService;
}