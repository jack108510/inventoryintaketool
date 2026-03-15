// Clinic Enhancement Module for Inventory Intake Tool
// Add this script after the main app loads

(function() {
    console.log('🏥 Loading Clinic Enhancement Module...');
    
    const CLINIC_DB_KEY = 'clinic_inventory_enhancement';
    const CLINIC_AUDIT_KEY = 'clinic_audit_log';
    
    // Initialize clinic data
    function initClinicData() {
        let clinicData = localStorage.getItem(CLINIC_DB_KEY);
        if (!clinicData) {
            clinicData = { items: [], settings: { expirationWarningDays: 30, lowStockThreshold: 10 } };
            localStorage.setItem(CLINIC_DB_KEY, JSON.stringify(clinicData));
        }
        return JSON.parse(clinicData);
    }
    
    function saveClinicData(data) {
        localStorage.setItem(CLINIC_DB_KEY, JSON.stringify(data));
    }
    
    function addAuditEntry(action, itemName, details) {
        let audit = JSON.parse(localStorage.getItem(CLINIC_AUDIT_KEY) || '[]');
        audit.unshift({
            action: action,
            itemName: itemName,
            details: details || '',
            user: 'Admin',
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(CLINIC_AUDIT_KEY, JSON.stringify(audit.slice(0, 100)));
    }
    
    // Add expiration, location, threshold to scanned items
    function enhanceScannedItem(item) {
        const clinicData = initClinicData();
        const clinicItem = clinicData.items.find(i => i.itemNumber === item.itemNumber || i.upcCode === item.upcCode);
        
        return {
            ...item,
            expiration: clinicItem?.expiration || '',
            location: clinicItem?.location || '',
            threshold: clinicItem?.threshold || 10,
            category: clinicItem?.category || 'supplies'
        };
    }
    
    // Get all enhanced items
    function getEnhancedItems() {
        if (typeof scannedItems !== 'undefined') {
            return scannedItems.map(enhanceScannedItem);
        }
        return [];
    }
    
    // Update clinic data for an item
    function updateClinicItem(itemNumber, upcCode, data) {
        const clinicData = initClinicData();
        const idx = clinicData.items.findIndex(i => i.itemNumber === itemNumber || i.upcCode === upcCode);
        
        if (idx >= 0) {
            clinicData.items[idx] = { ...clinicData.items[idx], ...data };
        } else {
            clinicData.items.push({ itemNumber, upcCode, ...data });
        }
        
        saveClinicData(clinicData);
    }
    
    // Get items that are expiring soon
    function getExpiringItems(days = 30) {
        const items = getEnhancedItems();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return items.filter(item => {
            if (!item.expiration) return false;
            const expDate = new Date(item.expiration);
            expDate.setHours(0, 0, 0, 0);
            const daysUntil = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
            return daysUntil >= 0 && daysUntil <= days;
        });
    }
    
    // Get low stock items
    function getLowStockItems() {
        const items = getEnhancedItems();
        return items.filter(item => item.quantity <= item.threshold);
    }
    
    // Get clinic stats
    function getClinicStats() {
        const items = getEnhancedItems();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let expiring = 0, lowStock = 0, expired = 0;
        
        items.forEach(item => {
            if (item.quantity <= item.threshold) lowStock++;
            if (item.expiration) {
                const expDate = new Date(item.expiration);
                expDate.setHours(0, 0, 0, 0);
                const daysUntil = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
                if (daysUntil < 0) expired++;
                else if (daysUntil <= 30) expiring++;
            }
        });
        
        return { total: items.length, expiring, lowStock, expired };
    }
    
    // Export functions globally
    window.ClinicEnhancement = {
        init: initClinicData,
        updateItem: updateClinicItem,
        getItems: getEnhancedItems,
        getExpiring: getExpiringItems,
        getLowStock: getLowStockItems,
        getStats: getClinicStats,
        getAudit: () => JSON.parse(localStorage.getItem(CLINIC_AUDIT_KEY) || '[]'),
        addAudit: addAuditEntry
    };
    
    console.log('🏥 Clinic Enhancement Module loaded');
})();
