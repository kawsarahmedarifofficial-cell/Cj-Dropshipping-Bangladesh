const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

// The first sed command replaced all <button className="bg-[#28a745] hover:bg-green-600 text-white px-6 py-2.5 font-bold rounded flex items-center shadow-lg transition-colors"> with <Link to="/register" ...
// And the second sed changed ALL </Link> to </button>.
// Let's just fix the mismatched tags.
content = content.replace(/See All \&gt;<\/button>/g, 'See All &gt;</Link>');
content = content.replace(/{cat\.name}\n\s*<\/button>/g, '{cat.name}\n                    </Link>');
content = content.replace(/JOIN MERRONO TODAY!\n\s*<\/button>/g, 'JOIN MERRONO TODAY!\n                  </Link>');
content = content.replace(/className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" \/>\n\s*<\/button>/g, 'className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />\n                </Link>');
content = content.replace(/<div className="font-bold text-green-600">৳ 1,250<\/div>\n\s*<\/div>\n\s*<\/button>/g, '<div className="font-bold text-green-600">৳ 1,250</div>\n                </div>\n              </Link>');

fs.writeFileSync('src/pages/Home.tsx', content);
