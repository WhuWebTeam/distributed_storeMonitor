module.exports = app => {
	
	const BaseController = require('./baseController')(app);

	class Test extends BaseController{

		constructor(app) {
			super(app);
		}
		

		index() {
			this.ctx.body = this._generateResponse(200, 'index test successed');
		}


		configTest() {
			this.ctx.body = this._generateResponse(200, this.app.config);
		}

		queryString() {
			const url = this.ctx.request.url;
			this.ctx.body = this._generateResponse(200, url);
		}


		async databaseTest() {
			const str = 'select * from test';
			try {
				const tests = await this.app.db.query(str, []);
				this.ctx.body = this._generateResponse(200, tests);
			} catch (err) {
				this.ctx.body = this._generateResponse(400, 'database test failed');
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
				this.ctx.body = this._generateResponse(200, { id: result.data });
				return;
			}

			this.ctx.body = this._generateResponse(400, 'get id failed');
		}

		async pgpass() {
			this.service.tenant._pgpass();
			this.ctx.body = this._generateResponse(200, 'pgpass successed');
		}

		async tenantTableRegister() {
			this.service.tenant.tenantTableRegister("wesine_00000");
			this.ctx.body = this._generateResponse(200, 'create table successed');
		}
	}

	return Test;
}