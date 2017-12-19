module.exports = app => {
	
	const BaseController = require('./baseController')(app);

	class Test extends BaseController{

		constructor(app) {
			super(app);
		}
		

		index() {
			this.ctx.body = this.__generateResponse(200, 'index test successed');
		}


		configTest() {
			this.ctx.body = this.__generateResponse(200, this.app.config);
		}

		queryString() {
			const url = this.ctx.request.url;
			this.ctx.body = this.__generateResponse(200, url);
		}


		async databaseTest() {
			const str = 'select * from test';
			try {
				const tests = await this.app.db.query(str, []);
				this.ctx.body = this.__generateResponse(200, tests);
			} catch (err) {
				this.ctx.body = this.__generateResponse(400, 'database test failed');
			}
		}

		async testTenant() {
			await this.service.tenant.tenantUrlRegister('wesine_2017_00002');
			this.ctx.body = {
				code: 200,
				data: 'add a new tenant successed'
			}
		}

		async testToken() {
			const result = await this.service.wesineSystem.getIdThroughToken('');

			if (result.flag) {
				this.ctx.body = this.__generateResponse(200, { id: result.data });
				return;
			}

			this.ctx.body = this.__generateResponse(400, 'get id failed');
		}

		async pgpass() {
			this.service.tenant._pgpass();
			this.ctx.body = this.__generateResponse(200, 'pgpass successed');
		}

		async tenantTableRegister() {
			console.log(this.ctx.url);
			this.service.tenant.tenantTableRegister("wesine_00000");
			this.ctx.body = this.__generateResponse(200, 'create table successed');
		}

		async cookie1() {
			let userName = this.ctx.cookies.get('userName');
			userName ? console.log(userName) : this.ctx.cookies.set('userName', 'test');

			userName = this.ctx.cookies.get('userName');
			console.log('company_' + userName);
			const token = this.ctx.cookies.get('company_' + userName);
			token ? console.log(token) : this.ctx.cookies.set('company_' + userName, Date.parse(new Date()));
			console.log(this.ctx.cookies);
			this.ctx.body = this.__generateResponse(200, { userName, token });
		}

		async cookie2() {
			const userName = this.ctx.cookies.get('userName');
			// if (userName != )
			const csrf = this.ctx.cookies.get('csrfToken');
			console.log(csrf);
			this.ctx.body = this.__generateResponse(200, { userName });
		}


		async tokenShow1() {
			console.log(this.ctx.cookies);
			this.ctx.body = this.__generateResponse(200, 'test');
		}


		async tokenShow2() {
			console.log('xxxxx');
			console.log('1:');
			console.log(this.app.tokenShow);
			if (this.__tokenShowGet('12')) {
				console.log(true);
			}
			console.log('2:');
			console.log(this.app.tokenShow);
			this.__tokenShowReset('12');
			console.log('3:');
			console.log(this.app.tokenShow);
			this.ctx.body = this.__generateResponse(200, 'test');
		}

		async deleteTable() {
			console.log(await this.service.tenant.tenantTableRetrieve('q1'));
			this.ctx.body = this.__generateResponse(203, 'delete table successed');
		}

		async urlDelete() {
			console.log(await this.service.tenant.tenantUrlRetrieve('q1'));
			this.ctx.body = this.__generateResponse(203, 'delete url successed');
		}
	}

	return Test;
}