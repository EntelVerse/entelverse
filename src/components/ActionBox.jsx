import React from 'react';
export function ActionBox({ title, description, icon: Icon, href }) {
    return (<a href={href} className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center space-y-4 border border-gray-100 hover:border-blue-100">
      <div className="p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
        <Icon size={32} className="text-blue-600"/>
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </a>);
}
