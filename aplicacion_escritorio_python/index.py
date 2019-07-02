from tkinter import ttk
from tkinter import *

import sqlite3

class producto:
	
	db_name='database.db'

	def run_query(self,query,parameters=()):
		with sqlite3.connect(self.db_name) as conn:
			curso=conn.cursor()
			result=curso.execute(query,parameters)
			conn.commit()
			return result
	pass

	def get_product(self):
		#limpiando los datos
		records=self.tree.get_children()
		for element in records:
			self.tree.delete(element)

		#consulta sql
		query='SELECT * FROM productos ORDER BY nombre DESC'
		db_rows=self.run_query(query)

		#rellenar datos
		for row in db_rows:
			self.tree.insert('',0,text=row[1], values=row[2])
	pass

	def  __init__(self, window):
		self.wind =window
		self.wind.title('Aplicacion Productos')

		#contenedor frame
		frame=LabelFrame (self.wind, text='Registra un nuevo producto')
		frame.grid(row=0,column=0,columnspan=3, pady=20)

		##crear una entrada de nombre

		Label(frame,text='Nombre: ').grid(row=1,column=0)
		self.name=Entry(frame)
		self.name.focus()
		self.name.grid(row=1,column=1)

		#price input
		Label(frame,text='Precio: ').grid(row=2,column=0)
		self.price=Entry(frame)
		self.price.grid(row=2,column=1)

		##boton agregar producto

		ttk.Button(frame,text='Guardar Producto', command=self.add_product).grid(row=3,columnspan=2,sticky=W+E)
		# mensaje de salida
		self.mensaje=Label(text='', fg='red')
		self.mensaje.grid(row=3,column=0,columnspan=2,sticky=W+E)
		#tabla

		self.tree=ttk.Treeview(height= 10, columns=2)
		self.tree.grid(row=4,column=0,columnspan=2)
		self.tree.heading('#0',text='Nombre',anchor =CENTER)
		self.tree.heading('#1',text='Precio',anchor =CENTER)

		#botones
		ttk.Button(text='Eliminar', command=self.delete_product).grid(row=5,column=0,sticky=W+E)
		ttk.Button(text='Editar', command=self.edit_product).grid(row=5,column=1,sticky=W+E)
		
		#llenando las filas
		self.get_product()

	pass

	def add_product(self):
		if self.validacion():
			query='INSERT INTO productos VALUES (NULL,?,?)'
			parameters=(self.name.get(),self.price.get())
			self.run_query(query,parameters)
			self.mensaje['text']='producto {} a sido agregado sastifactoriamnte'.format(self.name.get())
			self.get_product()
			self.name.delete(0,END)
			self.price.delete(0,END)
		else:
			self.mensaje['text']='Nombre y precio requeridos'
			

		self.get_product()
	pass

	def delete_product(self):
		self.mensaje['text']=''
		try:
			self.tree.item(self.tree.selection())['text'][0]
		except IndexError as e:
			self.mensaje['text']='porfavor selecciona un registro'
			return

		self.mensaje['text']=''
		name=self.tree.item(self.tree.selection())['text']
		query='DELETE FROM productos WHERE nombre=?'
		self.run_query(query, (name,))

		self.mensaje['text']='el registro {} ha sido eliminado satisfactoriamente'.format(name)
		self.get_product()
	pass

	def validacion(self):
		return len(self.name.get())!=0 and len(self.price.get())!=0

	pass

	def edit_product(self):

		self.mensaje['text']=''
		try:
			self.tree.item(self.tree.selection())['text'][0]
		except IndexError as e:
			self.mensaje['text']='porfavor selecciona un registro'
			return

		name=self.tree.item(self.tree.selection())['text']
		old_price=self.tree.item(self.tree.selection())['values'][0]

		self.edit_win=Toplevel()
		self.edit_win.title='Editar Producto'


		##old name
		Label(self.edit_win,text="old name: ").grid(row=0,column=1)
		Entry(self.edit_win,textvariable=StringVar(self.edit_win,value=name),state ='readonly' ).grid(row=0,column=2)
		#new name
		Label(self.edit_win,text="new name: ").grid(row=1,column=1)
		new_name=Entry(self.edit_win)
		new_name.grid(row=1,column=2)

		##old price
		Label(self.edit_win,text="old price: ").grid(row=2,column=1)
		Entry(self.edit_win,textvariable=StringVar(self.edit_win,value=old_price),state ='readonly' ).grid(row=2,column=2)
		#new price
		Label(self.edit_win,text="new price: ").grid(row=3,column=1)
		new_price=Entry(self.edit_win)
		new_price.grid(row=3,column=2)

		##boton

		Button(self.edit_win,text='actualizar',command=lambda:self.edit_records(new_name.get(),name,new_price.get(),old_price)).grid(row=4,column=2,sticky=W+E)


	pass

	def edit_records(self, new_name, name, new_price, old_price):

		query='UPDATE productos SET nombre=?, precio=? WHERE nombre=? AND precio=?'
		parameters=(new_name,new_price,name,old_price)
		self.run_query(query,parameters)
		self.edit_win.destroy()
		self.mensaje='el registro {} ha sido actualizado satisfactoriamente'.format(name)
		self.get_product()
	pass

if __name__=='__main__':
	window =Tk()
	application=producto(window)
	window.mainloop()
	pass