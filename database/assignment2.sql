-- Insert a new account record for Tony Stark
INSERT INTO account (
    account_firstname,
    account_lastname,
    account_email,
    account_password
)
VALUES (
    'Tony', 
    'Stark', 
    'tony@starkent.com', 
    'Iam1ronM@n'
);

-- Updating the account type to 'Admin' for an account using ID
UPDATE 
    account
SET 
    account_type = 'Admin'
WHERE 
    account_id = 1;

-- Deleting an account using ID
DELETE FROM 
    account 
WHERE 
    account_id = 1;

-- Updating the description of inventory items made by 'GM'
-- Replacing 'small interior' with 'a huge interior' in the description
UPDATE 
    inventory
SET 
    inv_description = REPLACE(inv_description, 'small interior', 'a huge interior')
WHERE 
    inv_make = 'GM';

-- Retrieving information about inventory items with a classification of 'Sport'
SELECT 
    inventory.inv_make, inventory.inv_model, classification.classification_name
FROM 
    inventory
INNER JOIN 
    classification
ON 
    inventory.classification_id = classification.classification_id
WHERE 
    classification.classification_name = 'Sport';

-- Updating image paths in the inventory table
-- Replacing '/images' with '/images/vehicles' in inv_image and inv_thumbnail columns
UPDATE 
    inventory
SET 
    inv_image = REPLACE(inv_image, '/images', '/images/vehicles'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles');


