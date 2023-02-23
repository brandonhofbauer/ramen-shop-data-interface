SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Inventory Items
CREATE OR REPLACE TABLE InventoryItems (
    inventoryID int AUTO_INCREMENT UNIQUE NOT NULL,
    item varchar(255) NOT NULL,
    type varchar(255) NOT NULL,
    quantity int,
    PRIMARY KEY(inventoryID)
);

-- Menu Items
CREATE OR REPLACE TABLE MenuItems (
    menuID int AUTO_INCREMENT UNIQUE NOT NULL,
    item varchar(255) NOT NULL,
    type varchar(255) NOT NULL,
    price double(19, 2) NOT NULL,
    PRIMARY KEY(menuID)
);

-- Recipes
-- Record is deleted when menu or inventory item is removed
CREATE OR REPLACE TABLE Recipes (
    RecipeID int AUTO_INCREMENT UNIQUE NOT NULL,
    menuID int,
    inventoryID int,
    reqAmt int NOT NULL,
    PRIMARY KEY (RecipeID),
    FOREIGN KEY (menuID) REFERENCES MenuItems (menuID) ON DELETE CASCADE,
    FOREIGN KEY (inventoryID) REFERENCES InventoryItems (inventoryID) ON DELETE CASCADE
);

-- Customers
CREATE OR REPLACE TABLE Customers (
    customerID int AUTO_INCREMENT UNIQUE NOT NULL, 
    name varchar(255) NOT NULL,
    phone varchar(255),
    email varchar(255),
    address varchar(255),
    PRIMARY KEY(customerID)
);

-- Employees
CREATE OR REPLACE TABLE Employees (
    employeeID int AUTO_INCREMENT UNIQUE NOT NULL,
    name varchar(255) NOT NULL,
    phone varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    role varchar(255) NOT NULL,
    PRIMARY KEY (employeeID) 
);

-- Orders
CREATE OR REPLACE TABLE Orders (
    orderID int AUTO_INCREMENT UNIQUE NOT NULL,
    customerID int NOT NULL,
    totalPrice double(19, 2) NOT NULL,
    orderOn datetime NOT NULL,
    PRIMARY KEY(orderID),
    FOREIGN KEY(customerID) REFERENCES Customers (customerID)
);

-- Employees who served an Order
-- Record is deleted when Order is Removed
CREATE OR REPLACE TABLE Order_Employees (
    orderID int,
    employeeID int,
    PRIMARY KEY (orderID, employeeID),
    FOREIGN KEY (orderID) REFERENCES Orders (orderID) ON DELETE CASCADE,
    FOREIGN KEY (employeeID) REFERENCES Employees (employeeID)
);

-- Items that were ordered
-- 
CREATE OR REPLACE TABLE Items_Ordered (
    orderID int,
    menuID int,
    PRIMARY KEY (orderID, menuID),
    FOREIGN KEY (orderID) REFERENCES Orders (orderID) ON DELETE CASCADE,
    FOREIGN KEY (menuID) REFERENCES MenuItems (menuID)
);

-- --Data Inserts

INSERT INTO Customers (name, phone, email, address) VALUES
('Emily', '972-409-5505', 'emil@gamail.net', '1101 Sampelton Street'),
('Philip', '3601234567', 'philip@email.com', '123 Address St'),
('VAGUE', NULL, NULL, NULL);

INSERT INTO Employees (name, phone, email, address, role) VALUES
('Steven', '802-878-8888', 'stev@mail.net', '1001 Stempletn Street', 'Paper Guy'),
('Jusut', '898-184-1884', 'jes@yahmail.org', '898987 Strong Lane', 'Printer Guy'),
('Sample Individual', '000-000-0000', 'sample@doe.li', 'Sample Street', 'Chef/Owner');

INSERT INTO InventoryItems (item, type, quantity) VALUES
('Noodles', 'Essential', 10),
('Spoons', 'Non-Essential', 100),
('Sriracha', 'Flavor', 10),
('Celery', 'Essential', 34),
('Steak', 'Essential', 2),
('Vegan Paste', 'Non-Essential', 10),
('Tofu', 'Secret Menu', 14);

INSERT INTO MenuItems (type, item, price) VALUES
('Veggie Water', 'Vegetarian', 80.99),
('Steak Noodles', 'Non-Veg', 17.99),
('Vegan Steak Noodles', 'Vegan', 20.99);

INSERT INTO Orders (customerID, totalPrice, orderOn) VALUES
(1, 200.25, '2022-05-05 10:30:00'),
(1, 215.00, '2022-05-06 10:31:00'),
(2, 10.73, '2022-05-06 11:19:31');

INSERT INTO Items_Ordered (orderID, menuID) Values 
(1, 2), (1, 1), 
(2, 1), 
(3, 3);

INSERT INTO Recipes (menuID, inventoryID, reqAmt) Values 
(1, 3, 3), (1, 4, 1),
(2, 1, 10), (2, 5, 10),
(3, 1, 1), (3, 4, 10), (3, 6, 30);

INSERT INTO Order_Employees (orderID, employeeID) Values 
(1, 1), (1, 3),
(2, 3),
(3, 1), (3, 2), (3, 3);

SET FOREIGN_KEY_CHECKS = 1;
SET AUTOCOMMIT = 1;